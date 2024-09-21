<template>
  <div>test</div>
</template>

<script setup lang="ts">
let mediaRecorder: MediaRecorder
let audioChunks = []

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.start()

    mediaRecorder.addEventListener('dataavailable', (event) => {
      audioChunks.push(event.data)
    })

    mediaRecorder.addEventListener('stop', () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
      encodeAndSendAudio(audioBlob)
      audioChunks = []
    })
  })
}

function encodeAndSendAudio(audioBlob) {
  const reader = new FileReader()
  reader.readAsDataURL(audioBlob)
  // Remove the "data:audio/wav;base64," part
  reader.onloadend = function () {
    const base64Audio = reader.result.split(',')[1]
    // send
    console.log(base64Audio)
    view.pushEvent('handle_audio', { message: base64Audio })
  }
}

function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop()
  }
}
</script>

<style lang="scss"></style>
