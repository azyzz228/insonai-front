<template>
  <div class="flex flex-col gap-6">
    <button @click="startRecording" :disabled="isRecording">Start Recording</button>
    <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
    <p v-if="isRecording">Recording...</p>
    <p v-if="isSending">Sending audio...</p>
    <p v-if="result">Result: {{ result }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mediaRecorder: null,
      audioChunks: [],
      isRecording: false,
      isSending: false,
      result: null
    }
  },
  methods: {
    startRecording() {
      this.isRecording = true;
      this.audioChunks = [];
      
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();

          this.mediaRecorder.addEventListener("dataavailable", event => {
            this.audioChunks.push(event.data);
          });

          this.mediaRecorder.addEventListener("stop", () => {
            this.sendAudioToServer();
          });
        })
        .catch(error => {
          console.error("Error accessing the microphone:", error);
          this.isRecording = false;
        });
    },
    stopRecording() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    },
    sendAudioToServer() {
      this.isSending = true;
      const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
      
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64Audio = reader.result.split(',')[1]; // Remove the "data:audio/wav;base64," part
        
        axios.post('http://localhost:4000/api', { audio: base64Audio })
          .then(_response => {
            // let response = JSON.parse(_response.data)
            // TODO: add incoming message to the chat. The incoming message will be 
            // AI Agent
            this.result = _response.data.text;
            this.isSending = false;
          })
          .catch(error => {
            console.error("Error sending audio:", error);
            this.result = "Error sending audio";
            this.isSending = false;
          });
      };
    }
  }
}
</script>

<style lang="scss"></style>
