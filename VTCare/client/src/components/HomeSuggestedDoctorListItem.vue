<script lang="ts">
import { defineComponent } from "vue";
import { Provider } from "@/types";


export default defineComponent({
  props: ['doctor', 'index'],
  methods: {
    doctorImageFileName: function (doctor: Provider): string {
      let name = "doctor" + this.index;
      name = name.replace(/ /g, "-");
      name = name.replace(/'/g, "");
      return `${name}.gif`;
    },
  }

});
</script>
<style scoped>
.doctor-box-suggested:first-child {

}

.doctor-box-suggested {
  color: #2c5049;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  alignment: left;
  width: 15em;
  margin-top: 2em;
  margin-left: 11em;
  padding: 5px;
  margin-bottom: 10em;
  justify-content: center;
}
.doctor-pic {
  border-radius: 50%;
  width: 60%;
}

.doctor-title-suggested {
  font-weight: bold;
}

.doctor-author-suggested {
  color: cadetblue;
}

.doctor-image-suggested {
  position: relative;
}

@media (max-width: 600px) {
  .doctor-box-suggested {
    margin-left: 0em;
  }
}
</style>

<template>
  <li class="doctor-box-suggested">
    <div class="doctor-image-suggested">
      <img
        class="doctor-pic"
        :src="require('@/assets/Image/doctors/' + doctorImageFileName(doctor))"
        :alt="doctor.name"
      />
    </div>
    <div class="doctor-title-suggested">
      <router-link to="/">{{ doctor.name }}</router-link>
    </div>
    <div class="doctor-author-suggested">
      <router-link to="">{{ doctor.specialization }}</router-link>
    </div>
  </li>
</template>
