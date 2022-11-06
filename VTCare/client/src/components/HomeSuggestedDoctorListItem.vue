<script setup lang="ts">
import { defineProps } from "vue";
import { BookItem } from "@/types";
const props = defineProps<{
  book: BookItem;
}>();
const bookImageFileName = function (book: BookItem): string {
  let name = book.name.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};
</script>
<style scoped>
.book-box-suggested:first-child {

}

.book-box-suggested {
  color: #2c5049;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  alignment: left;
  width: 15em;
  margin-top: 2em;
  margin-left: 11em;
  /*border: 0.01rem solid #cbcbcb;*/
  /*border-radius: 2px;*/
  padding: 5px;
  margin-bottom: 10em;
  justify-content: center;
}
.doctor-pic {
  border-radius: 50%;
  width: 60%;
}

.book-title-suggested {
  font-weight: bold;
}

.book-author-suggested {
  color: cadetblue;
}

.book-image-suggested {
  position: relative;
}

@media (max-width: 600px) {
  .book-box-suggested {
    margin-left: 0em;
  }
}
</style>

<template>
  <li v-if="book.isSuggested" class="book-box-suggested">
    <div class="book-image-suggested">
      <img
        class="doctor-pic"
        :src="require('@/assets/Image/doctors/' + bookImageFileName(book))"
        :alt="book.title"
      />
    </div>
    <div class="book-title-suggested">
      <router-link to="/">{{ book.name }}</router-link>
    </div>
    <div class="book-author-suggested">
      <router-link to="">{{ book.author }}</router-link>
    </div>
  </li>
</template>
