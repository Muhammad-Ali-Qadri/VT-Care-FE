<script lang="ts">

import appointment from '@/services/appointment';
import { Appointment } from '@/types';
import moment from 'moment';
import { defineComponent } from 'vue';

export default defineComponent({

    data() {
        return {
            appt: {} as Appointment,
            appointmentTimeStr: "",
            insurance: "",
            isNewPatient: true,
            isTOSSelected: false,
        }
    },
    methods: {
        async submitForm() {
            if (this.isTOSSelected) {
                this.appt.status = "SCHEDULED";
                this.appt.videoAppointment = true;
                await appointment.scheduleAppointment(this.appt); //TODO: Add to upcoming appointment in store.
                this.$router.push({ name: "home" })
            }
        }
    },
    created() {
        this.appt = this.$store.getters["AppointmentModule/getAppointment"] as Appointment;
        this.appointmentTimeStr = moment(this.appt.date).format("ddd, MMM DD") + " - " + this.appt.time;
    }
});

</script>

<style scoped>
.review-form {
    text-align: initial;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
}

.review-header {
    font-size: 1.1em;
    display: flex;
    justify-content: center;
}

.modal-body {
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.provider-detail {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1em;
}

.detail-provider-image img {
    width: 6em;
    height: 6em;
}

.detail-provider-pic {
    border-radius: 50%;
}

.detail-provider-info {
    gap: 2em;
    padding: 0.65em;
    width: 15em;
}

.detail-name-specialization {
    gap: 0.2em;
    text-align: left;
}

.detail-provider-name {
    font-weight: bold;
    font-size: 18px;
}

.detail-provider-specialization {
    font-style: italic;
    font-size: 15px;
}

.review-title {
    font-size: 1.5em;
    font-weight: bold;
}

.form-body {
    background: rgb(243, 243, 243);
    display: flex;
    flex-flow: column;
    justify-content: center;
}

form {
    padding: 1em;
    display: flex;
    flex-flow: column;
    justify-content: center;
}

.input-label {
    margin-top: 1em;
    margin: 1em;
}

.error-msg {
    color: red;
    font-size: 10px;
}

input,
select {
    padding: 0.5em;
}

.submit {
    background-color: rgb(0, 35, 75);
    border-color: rgb(0, 35, 75);
    color: rgb(255, 255, 255);
    text-decoration: none;
    cursor: pointer;
}

@media (max-width: 1000px) {
    .review-header {
        margin-left: 1em;
    }

    .review-question {
        margin-left: 1em;
    }
}
</style>

<template>
    <div class="review-form">
        <div class="modal-body">
            <div class="provider-detail">
                <div class="detail-provider-image">
                    <img class="detail-provider-pic"
                        :src="require('@/assets/Image/doctors/' + 'doctor' + 1 + '.gif')" />
                </div>
                <div class="detail-provider-info">
                    <div class="detail-name-specialization">
                        <div class="detail-provider-name">Dr. {{ appt?.providerName }}</div>
                        <i style="color:blueviolet" class="fa-sharp fa-solid fa-video"></i> <span
                            style="font-size:16px">Video Visit</span>
                        <div>
                            {{ appointmentTimeStr }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-body">
                <div class="review-header">
                    <p class="review-title">Review and Book</p>
                </div>
                <form @submit.prevent="submitForm()">
                    <!-- Insurance -->
                    <div class="input-label">
                        <div>
                            <div><span>insurance</span><br /></div>
                            <select v-model="insurance" placeholder="Enter your name">
                                <option value="self">I'm paying for myself</option>
                                <option value="Advance_Health">Advance Health</option>
                                <option value="Gold">Gold</option>
                                <option value="BCBS">Blue Cross</option>
                            </select><br />
                        </div>

                    </div>

                    <!-- First time? -->
                    <div class="input-label">
                        <span>Have you seen {{ appt.providerName }} before?</span><br />
                        <input type="radio" v-model="isNewPatient" value="true" />
                        <label style="margin-right: 0.5em">I'm a new patient</label>
                        <input type="radio" v-model="isNewPatient" value="false" />
                        <label>I've seen this doctor before</label><br />
                    </div>

                    <!-- First time? -->
                    <div style="width:20em" class="input-label">
                        <input type="checkbox" v-model="isTOSSelected" value="true" />
                        <label style="margin-left:1em">I certify that the insurance or payment selected is the one that
                            I will be using when I see this medical professional,
                            and that I have read and agree to the VTCare term of service. </label><br />
                        <h1 class="error-msg" v-if="!isTOSSelected">Please select checkbox</h1>
                    </div>

                    <div>
                        <input class="submit" type="submit" value="Book Appointment" />
                    </div>
                </form>
            </div>


        </div>

        <div class="review-question">
        </div>
    </div>
</template>