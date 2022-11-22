<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      searchbarval: "",
      genders: [ "Male" , "Female" , "Other"],
      startDate: "",
      endDate: "",
      Location: "",
      gendersel: "Preferred Gender",
      today: ""
    }
  },

  methods: {
    buildsearchParams(){
      let ans = "?";
      if(this.searchbarval != "")
        ans += "name=" + this.searchbarval +"&";
      if(this.startDate != this.today || this.endDate != this.today){
        ans += "startDate=" + this.startDate + "&";
      }
      if(this.endDate != this.today) {
        ans += "endDate=" + this.endDate + "&";
      }
      if(this.gendersel != "Preferred Gender") {
        ans+= "gender=" + this.gendersel + "&";
      }
      if(this.Location != "") {
        ans += "location=" + this.Location + "&";
      }
      if(ans !== "?")
        ans = ans.substring(0, ans.length-1);
      return ans;
    },

    sendSearchbar() {
      let obj = this.buildsearchParams();
      let fullpath = "providerlist" + obj;
      if(obj != "?") {
        console.log("somehow entered.")
        this.$router.push(fullpath);
      }
      else {
        this.$router.push({name: "providerlist"});
      }
    },

  },


  created() {
    let date = new Date();
    let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString()
        .split("T")[0];
    this.startDate = dateString;
    this.endDate = dateString;
    this.today = dateString;
    return;
  }

});


</script>

<style scoped>
.search-bar-section {
  background-color: #ececec;
  padding: 20px;
}
.search-bar {
  padding: 0.2em 1em;
  border: none;
  outline-width: 1em;
}
.search-button {
  display: table-cell;
  height: 5em;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  border: none;
  justify-content: center;
  background-color: #2c5049;
  width: 5em;
  flex-flow: row wrap;
}
.search-button:hover{
  background-color: #c0e5dd;;
}
.search-bar-form{
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 1em;
}

.search-bar-form div{
  background-color: white;
}

.divider{
  border-right: 1px solid rgb(206, 213, 221);
  margin: 0 8px;
}
.search-icon{
  display: inline;
}
@media (max-width: 1000px) {
  select{
    width: 6em;
  }
  input{
    width: 6em;
  }
}
</style>

<template>
  <div class="search-bar-section">
    <form class="search-bar-form">
      <div class ="search-bar-form">

        <div>
          <text class="location-icon">
            <i class="fa-solid fa-location-dot"></i>&nbsp;
          </text>
          <input name="Location" id="Location" type="text" v-model="Location" placeholder="Desired Location" autocomplete="off"
                 class="search-bar">
        </div>

        <div class="divider"></div>

        <div>
          <!-- gender preference goes here
          <label for="gender">
            Preferred gender
          </label>-->
          <select id="gender" v-model="gendersel" class="search-bar">
            <option disabled>Preferred Gender</option>
            <option v-for="item in genders" :value="item" :key="item">
              {{item}}
            </option>
          </select>
        </div>
        <div class="divider"></div>
        <div>
          <!-- start date goes here -->
          <span>Start Date</span> &nbsp;
          <input
              v-model="startDate"
              type="date"
              class="search-bar"
          /><br />
        </div>
        <div class="divider"></div>
        <!-- start date goes here -->
        <div class="search-bar">
          <span>End Date</span> &nbsp;
          <input
              v-model="endDate"
              type="date"
              class="search-bar"
          /><br />
        </div>
        <div class="divider">
        </div>
        <div class="search-bar">
          <input type="text" v-model="searchbarval"  class="search-bar" placeholder="Name" autocomplete="off" />
        </div>
      </div>
      <div>

      </div>
      <button type="submit" class="search-button" value="Search" @click.stop.prevent="sendSearchbar">
        <i class="fa-solid fa-magnifying-glass fa-2x search-icon"></i>
      </button>
    </form>
  </div>
</template>
