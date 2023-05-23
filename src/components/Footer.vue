<template>
  <footer class="footer-wrapper">
    <div class="divider-line"></div>
    <div class="news-subscribe">
      <label for="subscribe-input" class="subscribe-label"
        >Subscribe to get the newest products</label
      >
      <div class="subscribe-group">
        <input
          name="news-subscribe"
          id="subscribe-input"
          type="text"
          placeholder="Enter your email"
        />
        <button class="subscribe-btn">Subscribe</button>
      </div>
    </div>

    <div class="footer-content">
      <div class="footer-text">
        <h3 class="footer-title">Address</h3>
        <p class="footer-desc">
          No.283, Hello Street,<br />
          Dist West, <br />
          Taipei, Taiwan
        </p>
      </div>
      <div class="footer-text">
        <h3 class="footer-title">Contact Us</h3>
        <p class="footer-desc">
          tel: +886-900-122<br />
          email: twseafood@example.com
        </p>
      </div>

      <div class="footer-text">
        <h3 class="footer-title">Follow Us</h3>
        <p class="footer-desc">
          <a href=""><i class="bi bi-facebook"></i></a>
          <a href=""><i class="bi bi-instagram"></i></a>
          <a href=""><i class="bi bi-whatsapp"></i></a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-wrapper {
  background-color: $main-bg-color;
  padding: 10px 20px;
  width: 100%;
  height: auto;

}
.news-subscribe {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  .subscribe-label {
    font-size: 1.5rem;
    color: #FFF;
  }
  .subscribe-group {
    display: flex;
    height: 50px;
    width: 500px;
    #subscribe-input {
      width: 80%;
      padding: 8px;
      border: none;
      border-radius: 5px 0 0 5px;
      font-size: 1rem;
      color: #000;
      letter-spacing: 1.8px;
    }
    .subscribe-btn {
      width: 20%;
      background-color: #000;
      font-size: 1rem;
      padding: 10px;
      color: #fff;
      border-radius: 0 5px 5px 0;
      border: none;
      &:hover {
        background-color: #fff;
        color: #000;
        transition: all 0.2s ease-out;
        cursor: pointer;
      }
    }
  }
}
.footer-content {
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  .footer-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .footer-title {
      font-size: 1.5rem;
      color: #fff;
      margin-bottom: 2rem;
    }
    .footer-desc {
      line-height: 2rem;
      color: #fff;
      text-align: center;
      > a > i {
        color: #fff;
        font-size: 1.5rem;
        margin: 0 1rem;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .news-subscribe {
    height: 60%;
    .subscribe-group {
      width: 80%;
      flex-direction: column;
      .subscribe-btn {
        width: 100%;
        border-radius: 0 0 5px 5px;
      }
      #subscribe-input {
        width: 100%;
        letter-spacing: 1px;
        font-size: 1.1rem;
        border-radius: 5px 5px 0 0;
      }
    }
  }
}

@media screen and (max-width: 568px) {
 .footer-content{
    flex-direction: column;
    gap: 2rem;
 }
 .footer-text {
    margin-top: 2rem;
 }
}
</style>
