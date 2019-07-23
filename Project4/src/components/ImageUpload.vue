<template>
   <div>
      <!-- <img id="preview" src="previewImage" class="uploading-image" /> -->
      <img id="preview" src="" width="700" alt="로컬에 있는 이미지가 보여지는 영역">
      <a id="download" download="thumbnail.jpg" target="_blank">
        <img id="thumbnail" src="" width="100" alt="썸네일영역 (클릭하면 다운로드 가능)">
      </a>
      <input type="file" accept="image/jpeg" @change='uploadImage'>
   </div>
</template>

<script>
export default {
  name: 'imageUpload',
  data () {
    return {
      previewImage: null
    }
  },
  methods: {
    uploadImage (e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      // const url = reader.readAsDataURL(image)
      reader.readAsDataURL(image)

      reader.onload = e => {
        this.previewImage = e.target.result

        document.querySelector('#preview').src = reader.result

        // 썸네일 이미지 생성
        var tempImage = new Image() // drawImage 메서드에 넣기 위해 이미지 객체화
        tempImage.src = reader.result // data-uri를 이미지 객체에 주입
        tempImage.onload = function () {
          // 리사이즈를 위해 캔버스 객체 생성
          var canvas = document.createElement('canvas')
          var canvasContext = canvas.getContext('2d')

          // 캔버스 크기 설정
          canvas.width = 100 // 가로 100px
          canvas.height = 100 // 세로 100px

          // 이미지를 캔버스에 그리기
          canvasContext.drawImage(this, 0, 0, 100, 100)

          // 캔버스에 그린 이미지를 다시 data-uri 형태로 변환
          var dataURI = canvas.toDataURL('image/jpeg')

          // 썸네일 이미지 보여주기
          document.querySelector('#thumbnail').src = dataURI

          // 썸네일 이미지를 다운로드할 수 있도록 링크 설정
          document.querySelector('#download').href = dataURI
        }
      }
    }
  }
} // missing closure added
</script>



<style>
   .uploading-image{
     display:flex;
   }
</style>