<script lang="ts">

import { Appointment, Provider } from '@/types';
import moment from 'moment';

import { defineComponent } from "vue";


export default defineComponent({
    props: ['provider', 'imageCounter'],
    data() {
        return {
            weeksToShow: 2,
            startDate: "",
            endDate: "",
            date: moment(),
            appointmentTimes: {} as Record<string, Set<string>>,
            detailedSchedule: {}
        };
    },
    methods: {
        closeModal() {
            this.$emit('closePopup');
        },

        bookOnTime(slot: string, duration: number, date: moment.Moment) {
            this.$emit('slotSelected', slot, duration, date);
        },

        constructFutureAppointments(appts: Appointment[]) {
                appts?.forEach(appt => {
                let dateStr = moment(appt.date).format("DD/MM/YYYY");

                if (!this.appointmentTimes[dateStr]) {
                    this.appointmentTimes[dateStr] = new Set<string>();
                }

                if (appt.status === 'SCHEDULED' || appt.status === 'PROCEEDING')
                this.appointmentTimes[dateStr].add(moment(appt.time, 'hh:mm:ss').format("hh:mm A"));
            });
        },

        nextCycle() {
            this.date.add(14, "days");
            this.generateSlotStructure();

        },

        prevCycle() {
            let currDate = moment();

            if (!currDate.isSame(this.date)) {
                this.date.add(-14, "days");
                this.generateSlotStructure();
            }
        },

        generateSlotStructure() {
            let date = moment(this.date);
            this.startDate = date.format("MMM DD");
            date.add(14, "days");
            this.endDate = date.format("MMM DD");

            this.detailedSchedule = this.getCycleSchedule();
        },

        getDateSchedule(date: moment.Moment) {
            let times: {
                time: string,
                duration: number
            }[] = [];

            (this.provider as Provider).availabilitySchedule.forEach(slot => {
                if (slot.day == date.weekday()) {
                    let startTime = moment(slot.startTime, 'hh:mm:ss');
                    let endTime = moment(slot.endTime, 'hh:mm:ss');

                    while (!startTime.isSame(endTime)) {
                        let start = startTime.format("hh:mm A") as string;
                        let tempDate = date.format("DD/MM/YYYY") as string;

                        if (!(this.appointmentTimes[tempDate] != undefined && this.appointmentTimes[tempDate].has(start))) {
                            times.push({
                                time: startTime.format("hh:mm A"),
                                duration: slot.slotDuration
                            });
                        }

                        startTime.add(slot.slotDuration, "minutes");
                    }
                }
            });

            return times;
        },

        getCycleSchedule() {
            let detailedSchedule: {
                dayStr: string;
                date: string;
                slotTime: {
                    time: string,
                    duration: number
                }[];
                dateObj: moment.Moment;
            }[] = [];

            let currDate = moment(this.date);

            for (let i = 0; i < 14; i++) { //For current cycle
                let dateStr = "Today";
                if (i == 1) {
                    dateStr = "Tomorrow";
                }
                else if (i > 1) {
                    dateStr = currDate.format("ddd");
                }

                detailedSchedule.push({
                    dayStr: dateStr,
                    date: currDate.format("MMM D"),
                    slotTime: this.getDateSchedule(currDate),
                    dateObj: moment(currDate)
                })

                currDate.add(1, "days");
            }

            return detailedSchedule;
        }
    },
    created() {
        this.constructFutureAppointments(this.provider.upcomingAppointments);
        this.constructFutureAppointments(this.$store.getters["UserModule/getUser"]?.upcomingAppointments);
        this.generateSlotStructure();
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

.modal-container {
    width: 40em;
    height: 40em;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    overflow-y: scroll;
}

.info-container {
    position: fixed;
    margin: -1.2em -1.85em;
    box-shadow: 0 2px 2px rgb(0 0 0 / 33%);
    width: 39em;
    height: 13em;
    z-index: 100;
    background: white;
}

.modal-header {
    margin-right: 1em;
    margin-top: 1em;
    float: right;
}

.modal-body {
    margin-top: 2em;
    margin-bottom: 1em;
    margin-left: 2em;
    position: sticky;
    display: flex;
    flex-direction: row;
    justify-content: top;
}

.detail-provider-image img {
    width: 6em;
    height: 6em;
    float: left;
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

.date-panel {
    text-align: left;
    font-weight: bold;
    bottom: -2.5em;
    margin-left: 2em;
    font-size: 22px;
    display: grid;
    grid-template-columns: 30% 30%;
}

.cycle-navigation {
    margin: 0 1em;
}

.detail-display-message {
    margin-left: 2.8em;

    font-size: 15px;
    text-align: left;
}

.slot-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1.5em 0;
    margin-top: 12em;
    position: relative;
    overflow: hidden;
}

.date-text {
    text-align: left;
    font-size: 17px;
    line-height: 1.5em;
    font-weight: bold;
    width: 20em;
    margin: 0.5em 0;

}

.date-no-availability {
    color: rgb(102, 115, 133);
    opacity: 0.5;
}

.item-box {
    display: flex;
    flex-wrap: wrap;
    margin: 1em 0;
}

.time-slot {
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
    border: 1px solid rgb(255, 240, 75);
    color: rgb(0, 35, 75);
    flex: 0 0 auto;
    width: 5em;
    margin: 0px 8px 8px 0px;
}

.time-slot:hover {
    background-color: midnightblue;
    color: white;
}
</style>

<template>
    <Transition enter-active-class="animated fadeIn zoomIn" leave-active-class="animated fadeOut zoomOut">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="info-container">
                        <div class="modal-header">
                            <a style="color:black"><i class="fa-solid fa-xmark fa-2x" @click="closeModal()"></i></a>
                        </div>

                        <div class="modal-body">
                            <div class="detail-provider-image">
                                <img class="detail-provider-pic"
                                    :src="require('@/assets/Image/doctors/' + 'doctor' + imageCounter + '.gif')" />
                            </div>
                            <div class="detail-provider-info">
                                <div class="detail-name-specialization">
                                    <div class="detail-provider-name">Dr. {{ provider.name }}</div>
                                    <div class="detail-provider-specialization">{{ provider.specialization }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="date-panel">
                            {{ startDate }} - {{ endDate }}
                            <span class="cycle-navigation"><a style="color:black"><i @click="prevCycle()"
                                        class="fa-solid fa-chevron-left"></i></a>
                                <a style="color:black"><i @click="nextCycle()"
                                        class="fa-solid fa-chevron-right"></i></a>
                            </span>
                        </div>
                        <div class="detail-display-message">
                            <p>
                                Choose A time with Dr. {{ provider.name }} that works for you!
                            </p>
                        </div>

                    </div>
                    <div style="">
                        <div class="slot-box">
                            <div class="date-box" v-for="detail in detailedSchedule" :key="detail">
                                <div class="date-text">
                                    {{ detail.dayStr }}, {{ detail.date }}
                                    <span class="date-no-availability" v-if="detail.slotTime?.length == 0">
                                        No Availability
                                    </span>
                                </div>

                                <div class="item-box" v-if="detail.slotTime?.length > 0">
                                    <button class="time-slot" v-for="slot in detail.slotTime" :key="slot"
                                        @click="bookOnTime(slot.time, slot.duration, detail.dateObj)">
                                        {{ slot.time }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
  
