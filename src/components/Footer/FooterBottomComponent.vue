<template>
    <div class="footer_bottom">
      <div class="container">
        <div class="row align-items-center text-center">
          <div class="col col-md-12">
            <p class="copyright_text">
              Developed by <b><a target="_blank" href="https://annasoft.ru">Annasoft</a></b>. {{ sinceYear }}{{ actualYear }}
            </p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>


export default {
    name: 'FooterBottomComponent',
    data () {
        return {
          sinceYear: 2024,
        }
    },
    computed: {
      actualYear () {
        let actualYear = new Date().getFullYear()
        if (actualYear != this.sinceYear) {
          return ` - ${actualYear}`
        }
        return ''
      }
    }
}
</script>
<style scoped>

</style>