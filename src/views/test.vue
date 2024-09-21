<template>
  <div class="flex flex-col gap-6">
    <button @click="startRecording" :disabled="isRecording">Start Recording</button>
    <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
    <p v-if="isRecording">Recording...</p>
    <p v-if="isSending">Sending audio...</p>
    <p v-if="result">Result: {{ result }}</p>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const mediaRecorder = ref<MediaRecorder | null>(null)
const audioChunks = ref<Blob[]>([])
const isRecording = ref<boolean>(false)
const isSending = ref<boolean>(false)
const result = ref<string | null>(null)

const startRecording = () => {
  isRecording.value = true
  audioChunks.value = []

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream: MediaStream) => {
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
  reader.onloadend = () => {
    const base64Audio = (reader.result as string).split(',')[1] // Remove the "data:audio/wav;base64," part

    // This is a dummy UUID from our local db, dont be fooled :))
    const conversation_id = "26072afc-0c87-47a0-8647-f927b737799d"

    axios
      .post(`http://localhost:8000/tts/client_speech_text/${conversation_id}/`, { text: base64Audio })
      .then((_response) => {
        isSending.value = false
        // TODO: input is a file
        result.value = _response.data.text
      })
      .catch((error: Error) => {
        console.error('Error sending audio:', error)
        result.value = 'Error sending audio'
        isSending.value = false
      })
  }
}
</script>

<style lang="scss"></style>
