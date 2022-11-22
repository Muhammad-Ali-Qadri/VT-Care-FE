<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      searchBarVal: "",
      genders: [ "Male" , "Female" , "Other"],
      startDate: "",
      endDate: "",
      location: "",
      gender: "Preferred Gender",
      specialization: ""
    }
  },

  methods: {
    buildSearchParams(){
      let ans = "?";
      if(this.searchBarVal != "")
        ans += "name=" + this.searchBarVal +"&";
      if(this.specialization != "" ){
        ans += "specialization=" + this.specialization + "&";
      }
      if(this.gender != "Preferred Gender") {
        ans+= "gender=" + this.gender + "&";
      }
      if(this.location != "") {
        ans += "location=" + this.location + "&";
      }
      if(ans !== "?")
        ans = ans.substring(0, ans.length-1);
      return ans;
    },

    sendSearchbar() {
      let obj = this.buildSearchParams();
      let fullpath = "providerlist" + obj;
      if(obj != "?") {
        this.$router.push(fullpath);
      }
      else {
        this.$router.push({name: "providerlist"});
      }
    },

  },


  created() {
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
          <input name="location" id="location" type="text" v-model="location" placeholder="Desired location" autocomplete="off"
                 class="search-bar">
        </div>

        <div class="divider"></div>

        <div>
          <!-- gender preference goes here
          <label for="gender">
            Preferred gender
          </label>-->
          <select id="gender" v-model="gender" class="search-bar">
            <option disabled>Preferred Gender</option>
            <option v-for="item in genders" :value="item" :key="item">
              {{item}}
            </option>
          </select>
        </div>
        <div class="divider"></div>
        <div>
          <input name="specialization" id="specialization" type="text" v-model="specialization" placeholder="specialization" autocomplete="off"
                              class="search-bar"></div>
        <div class="divider">
        </div>
        <div class="search-bar">
          <input type="text" v-model="searchBarVal"  class="search-bar" placeholder="Name" autocomplete="off" />
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
