<template>
  <Transition>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="info-container">
            <div class="modal-header">
              <a style="color:black"><i class="fa-solid fa-xmark fa-2x" @click="closeModal()"></i></a>
            </div>
            <div class="notes-header-body">
              <div class="patient-info">
                {{ patientName }}
              </div>
              <div class="Date">
                {{formatDate(apptDate)}}
              </div>
            </div>
          </div>
          <div class="notes-container">
              <div class="diagnosis-content">
                  <div>
                    <label for="diagnosis">Diagnosis</label>
                  </div>
                  <div class="textarea-parent">
                    <textarea id="diagnosis" v-model="diagnosis"></textarea>
                  </div>
              </div>
              <div class="prescription-content">
                  <div>
                    <label for="prescription">Prescription</label>
                  </div>
                  <div class="textarea-parent">
                    <textarea id="prescription" v-model="prescription"></textarea>
                  </div>
              </div>
              <div class="notes-content">
                  <div>
                    <label for="notes">Notes</label>
                  </div>
                  <div class="textarea-parent">
                    <textarea id="notes" v-model="notes"></textarea>
                  </div>
              </div>
              <div class="checkbox-submit">
                <div class="checkbox">
                  <input type="checkbox" id="signed" name="signed" @click="checked=!checked">&nbsp;
                  <label for="signed">Ready to submit?</label>
                </div>
                <div class="button-container">
                  <button :disabled="!checked" @click="persistAndClose" class="ready-button">
                    submit
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
  </Transition>
</template>

<script lang="ts">
import patient from "@/services/patient";
import makeToast from './toast/makeToast';
import moment from 'moment';
import { defineComponent } from 'vue';
export default defineComponent({
  name: "NotesPopup",
  props: [
      "apptDate",
      "providerName",
      "patientName",
      "patientId",
  ],

  methods: {
    closeModal() {
      this.$emit('closePopup');
    },

    async persistAndClose() {
      const resp = await patient.addHistory({
        patientId: this.patientId,
        apptDate: this.apptDate as string,
        providerName: this.providerName, // make these 3 properties at some point (integration time)
        diagnosis: this.diagnosis,
        prescription: this.prescription,
        notes: this.notes,
      });
      if(resp.id !== -1)
        makeToast("Notes added", 'success');
      else
        makeToast("Issue saving notes", 'danger');
      this.$emit('submitNotes');
    },

    formatDate(date: string){
      let x = moment(date);
      return x.format("DD MMM yyyy");
    }
  },
  data() {
    return{
      checked: false,
      notes: "",
      prescription: "",
      diagnosis: "",
    }
  },
});
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(83, 79, 79, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-header {
  margin-right: 1em;
  margin-top: 1em;
  float: right;
}

.modal-container {
  width: 45em;
  height: 45em;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
}

.info-container {
  position: fixed;
  margin: -1.2em -1.8em;
  box-shadow: 0 2px 2px rgb(0 0 0);
  width: 45em;
  height: 6em;
  z-index: 100;
  background: white;
}

.notes-header-body {
  margin-top: 2em;
  margin-bottom: 1em;
  margin-left: 2em;
  position: sticky;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  font-size: 24px;
  font-weight:bold;
}

.notes-container{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 5fr 5fr 5fr;
  row-gap: 2em;
  column-gap: 1em;
  margin-top: 6em;
  overflow: hidden;
  height: 39em;
}

.notes-content{
  grid-column: 2;
  grid-row: 1/3;
}

.diagnosis-content{
  grid-column: 1;
  grid-row: 1/2;
}

.prescription-content{
  grid-column: 1;
  grid-row: 2/3;
}
.textarea-parent{
  height:100%;
}

textarea{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.checkbox-submit{
  display: flex;
  flex-flow: column wrap;
  justify-content: start;
  row-gap: 1em;
}

.checkbox{
  display: flex;
  justify-content: left;
}

.ready-button {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-size: 14px;
  line-height: 1em;
  height: 2em;
  justify-content: center;
  padding: 0px;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  animation: 0.1s ease-out 0s 1 normal forwards running kVDtSm;
  cursor: pointer;
  background-color: rgb(255, 240, 75);
  border: 1px solid;
  color: rgb(0, 35, 75);
  flex: 0 0 auto;
  width: 5em;
  margin: 0px 8px 8px 0px;
}

.ready-button:disabled{
  background-color: gray;
  opacity:50%;
  cursor:initial;
}
label{
  font-weight: bold;
}
</style>