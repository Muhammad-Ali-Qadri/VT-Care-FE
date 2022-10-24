<style scoped>
@media (max-width: 600px) {
  header {
    flex-direction: column;
  }
}
.footer-sec {
  background-color: #ececec;
  padding: 30px;
  text-align: left;
}
.footer-sec p {
  display: inline-block;
}
.footer-copyright {
  background-color: #d5d5d5;
  padding: 10px;
  text-align: left;
  font-size: 10px;
}
.footer-copyright p {
  margin-left: 400px;
}
.footer-nav {
  font-size: 15px;
  font-weight: bold;
  color: #2c5049;
}

.footer-nav.Privacy {
  margin-left: 390px;
}
.footer-nav.Term {
  margin-left: 40px;
}
.footer-nav.Accessibility {
  margin-left: 40px;
}
.footer-nav.About {
  margin-left: 40px;
}
</style>

<template>
  <footer>
    <section class="footer-sec">
      <p>
        <router-link to="/" class="footer-nav Privacy"
          >Privacy Policy</router-link
        >
      </p>
      <p>
        <router-link to="/" class="footer-nav Term"
          >Terms of Service</router-link
        >
      </p>
      <p>
        <router-link to="/" class="footer-nav Accessibility"
          >Accessibility</router-link
        >
      </p>
      <p>
        <router-link to="/" class="footer-nav About">About</router-link>
      </p>
    </section>
    <section class="footer-copyright">
      <p>Copyright 2022 Fossils. All rights Reserved</p>
      <p>Privacy Policy | Terms & Conditions</p>
    </section>
  </footer>
</template>
