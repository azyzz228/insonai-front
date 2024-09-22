<template>
  <div class="call-page flex flex-col gap-[30px]">
    <div class="flex items-center justify-between h-[56px]">
      <v-button :disabeld="isButtons === true" @click="isButtons = !isButtons" large class="w-fit">
        Start your call
      </v-button>
      <voice-visualization :indicator="peakIndicator" v-if="indicator" />
      <div v-if="isButtons" class="flex items-center gap-[12px] justify-center pr-[20px]">
        <button
          @click="makeCall"
          type="button"
          :disabled="isCalling"
          v-if="!isCalling"
          class="answer-button rounded-full bg-green-500 p-4 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PhoneIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          v-else
          type="button"
          @click="endCall"
          class="rounded-full relative z-10 bg-red-500 p-4 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PhoneXMarkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
    <main-chat :is-call-started="isCalling" />
  </div>
</template>

<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
import MainChat from '@/components/dashboard-section/MainChat.vue'
import { PhoneIcon, PhoneXMarkIcon } from '@heroicons/vue/20/solid'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import VoiceVisualization from '@/components/dashboard-section/VoiceVisualization.vue'
import useConversationApi from '@/api/ApiConversation'

// api
const { createConversation } = useConversationApi()
const result = ref<string | null>(null)
const conversation_api = import.meta.env.CONVERSATION_API
const conversation_id = ref()
// states
const isCalling = ref(false)
const isButtons = ref(false)
const indicator = ref(false)

// audio
const mediaRecorder = ref<MediaRecorder | null>(null)
const audioChunks = ref<Blob[]>([])
const isRecording = ref<boolean>(false)
const isSending = ref<boolean>(false)
const audioSrc = ref()
const audioPlayer = ref()
const peakIndicator = ref(0)

// --
const conversationPost = async () => {
  const res = await createConversation({
    llm_use_case: conversation_api,
    customer: null
  })
  conversation_id.value = res.data?.conversation_id
}
// --
// start of recording
const startRecording = () => {
  isRecording.value = true
  audioChunks.value = []

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream: MediaStream) => {
      // indicator
      const context = new AudioContext()
      const source = context.createMediaStreamSource(stream)
      const analyser = context.createAnalyser()
      source.connect(analyser)
      // The array we will put sound wave data in
      const array = new Uint8Array(analyser.fftSize)

      function getPeakLevel() {
        analyser.getByteTimeDomainData(array)
        return array.reduce((max, current) => Math.max(max, Math.abs(current - 127)), 0) / 128
      }

      function tick() {
        if (isRecording.value) {
          const peak = getPeakLevel()
          peakIndicator.value = peak * 100
          requestAnimationFrame(tick)
        } else {
          peakIndicator.value = 0
        }
      }
      tick()
      // media-recorder
      mediaRecorder.value = new MediaRecorder(stream)
      mediaRecorder.value.start()

      mediaRecorder.value.addEventListener('dataavailable', (event: BlobEvent) => {
        audioChunks.value.push(event.data)
      })

      mediaRecorder.value.addEventListener('stop', () => {
        sendAudioToServer()
      })
    })
    .catch((error: Error) => {
      console.error('Error accessing the microphone:', error)
      isRecording.value = false
    })
}
// finish the record
const stopRecording = () => {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
  }
}

const sendAudioToServer = () => {
  isSending.value = true
  const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' })

  const reader = new FileReader()
  reader.readAsDataURL(audioBlob)
  reader.onloadend = async () => {
    const base64Audio = (reader.result as string).split(',')[1] // Remove the "data:audio/wav;base64," part

    // This is a dummy UUID from our local db, don't be fooled :))

    try {
      const response = await axios.post(
        `http://localhost:8000/tts/client_speech_text/${conversation_id}/`,
        { text: base64Audio },
        {
          responseType: 'arraybuffer'
        }
      )

      const audioBlob = new Blob([response.data], { type: 'audio/wav' })

      audioSrc.value = URL.createObjectURL(audioBlob)
      isSending.value = false
      if (audioPlayer.value) {
        audioPlayer.value.load()
      }
      result.value = response.data.data
    } catch (error) {
      console.error('Error sending audio:', error)
      isSending.value = false
    }
  }
}
const endCall = () => {
  isButtons.value = false
  isCalling.value = false
  indicator.value = false
  stopRecording()
}
const makeCall = () => {
  isCalling.value = !isCalling.value
  indicator.value = !indicator.value
  startRecording()
}

onMounted(async () => {
  await conversationPost()
})
</script>

<style scoped lang="scss">
.answer-button {
  position: relative;
  z-index: 2;
  &::before {
    content: '';
    z-index: 1;
    position: absolute;
    border: 1px solid rgb(34 197 94 / 1);
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: pulse 1s linear infinite;
  }
  &::after {
    content: '';
    z-index: 1;
    position: absolute;
    border: 1px solid rgb(34 197 94 / 1);
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: pulse 1s linear infinite;
    animation-delay: 0.3s;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  50% {
    transform: scale(1.3);
    opacity: 1;
  }

  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
</style>
