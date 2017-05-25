<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-copyright">
        ©
        <span itemprop="copyrightYear">2016</span>
        <span class="author">万小万</span>
      </div>
      <div class="footer-by">
        由 <a class="theme-link" href="http://www.onfuns.com">onfuns</a> 强力驱动
      </div>
    </div>
  </footer>
</template>
<style scoped>
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px 0;
    color: #bfbfbf;
    background: #373737;
  }
  .footer a{
    color: #bfbfbf;
  }
  .footer .footer-inner {
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
    width: 700px;
  }
  .footer .footer-copyright{
    display: inline-block;
  }
  .footer .footer-by {
    display: inline-block;
    margin-left: 20px;
  }
</style>
