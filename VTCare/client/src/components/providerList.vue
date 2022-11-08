<script lang="ts">

import provider from "@/services/provider";
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: { SearchBar },
  data() {
    return {
      listItems: [],
    };
  },
  methods: {
    async getData() {
      const res = await provider.getProviders();
      console.log(res);
      this.listItems = res;
    },
  },
  created() {
    this.getData();
  },
};

</script>

<style>
.provider-box {
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 0.9em;
  gap: 0.25em;
  min-height: 11.2em;
}

#provider-boxes {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5em;
  gap: 0.75em;
  margin-left: 5em;
}

.provider-info {
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 0.65em;
  width: 12em;
}

.name-specialization {
  display: flex;
  justify-content: top;
  flex-direction: column;
  gap: 0.2em;
  text-align: left;
}

.provider-name {
  font-weight: bold;
  font-size: 18px;
}

.provider-specialization {
  font-style: italic;
  font-size: 15px;
}

.provider-image img {
  width: 130px;
  height: 110px;
}

.provider-pic {
  border-radius: 50%;
}

.appointment-times {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  margin-left: 2em;
}

.slots-row {
  display: flex;
  gap: 0.3em;
}

.slot {
  display: flex;
  width: 4.5em;
  height: 7em;
  border-radius: 0.6em;
  cursor: pointer;
  background-color: greenyellow;
  border: none;
  gap: 1em;
  flex-direction: column;
  text-align: left;
}

.slot:enabled:hover {
  background-color: midnightblue;
  color: white;
}

.slot:disabled {
  background-color: lightgrey;
  cursor: initial;
  opacity: 70%;
}

@media (max-width: 800px) {
  .provider-box {
    min-width: 16.5em;
    min-height: 14.2em;
  }

}
</style>

<template>

  <SearchBar></SearchBar>
  <ul id="provider-boxes" v-for="(item, index) in listItems" :key="item">
    <li class="provider-box">
      <div class="provider-image">
        <img class="provider-pic" :src="require('@/assets/Image/doctors/' + 'doctor' + (index + 1) + '.gif')" />
      </div>
      <div class="provider-info">
        <div class="name-specialization">
          <div class="provider-name">{{ item.name }}</div>
          <div class="provider-specialization">{{ item.specialization }}</div>
        </div>
      </div>

      <div class="appointment-times">
        <div class="slots-row">
          <button class="slot">
            <div>
              <div>Sun</div>
              <div>Nov 6</div>
            </div>
            <div>
              <div>1</div>
              <div>appts</div>
            </div>
          </button>
          <button class="slot">
            <div>
              <div>Mon</div>
              <div>Nov 7</div>
            </div>
            <div>
              <div>5</div>
              <div>appts</div>
            </div>
          </button>
          <button class="slot">
            <div>
              <div>Tue</div>
              <div>Nov 8</div>
            </div>
            <div>
              <div>No</div>
              <div>appts</div>
            </div>
          </button>
          <button disabled class="slot" id="slot1">
            <div>
              <div>Wed</div>
              <div>Nov 9</div>
            </div>
            <div>
              <div>20</div>
              <div>appts</div>
            </div>
          </button>
          <button class="slot">
            <div>
              <div>Thu</div>
              <div>Nov 10</div>
            </div>
            <div>
              <div>25</div>
              <div>appts</div>
            </div>
          </button>
          <button disabled class="slot" id="slot2">
            <div>
              <div>Fri</div>
              <div>Nov 11</div>
            </div>
            <div>
              <div>27</div>
              <div>appts</div>
            </div>
          </button>
          <button disabled class="slot" id="slot3">
            <div>
              <div>Sat</div>
              <div>Nov 12</div>
            </div>
            <div>
              <div>21</div>
              <div>appts</div>
            </div>
          </button>
        </div>
        <div class="slots-row">
          <button class="slot">
            <div>
              <div>Sun</div>
              <div>Nov 13</div>
            </div>
            <div>
              <div>20</div>
              <div>appts</div>
            </div>
          </button>
          <button class="slot">
            <div>
              <div>Mon</div>
              <div>Nov 14</div>
            </div>
            <div>
              <div>25</div>
              <div>appts</div>
            </div>
          </button>
          <button class="slot">
            <div>
              <div>Tue</div>
              <div>Nov 15</div>
            </div>
            <div>
              <div>25</div>
              <div>appts</div>
            </div>
          </button>
          <button class="slot">
            <div>
              <div>Wed</div>
              <div>Nov 16</div>
            </div>
            <div>
              <div>21</div>
              <div>appts</div>
            </div>
          </button>
          <button disabled class="slot" id="slot5">
            <div>
              <div>Thu</div>
              <div>Nov 17</div>
            </div>
            <div>
              <div>21</div>
              <div>appts</div>
            </div>
          </button>
          <button disabled class="slot" id="slot4">
            <div>
              <div>Fri</div>
              <div>Nov 18</div>
            </div>
            <div>
              <div>21</div>
              <div>appts</div>
            </div>
          </button>
          <button class="slot">
            <div>
              <div>Sat</div>
              <div>Nov 19</div>
            </div>
            <div>
              <div>21</div>
              <div>appts</div>
            </div>
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>