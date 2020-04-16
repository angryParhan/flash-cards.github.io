<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" ref="mainBlock">



          <button class="btn btn_confirm" @click="$emit('edit')">EDIT</button>
          <button class="btn btn_cancel" @click="$emit('cancel')">CANCEL</button>
          <button class="btn btn_cancel" @click="$emit('delete')">DELETE</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "modalWindow",
    mounted () {
      this.$refs.mainBlock.style.top = this.topValue
      this.$refs.mainBlock.style.left = this.leftValue
    },
    props: {
      confirmMessage: {
        type: String,
        default: 'Are you sure about this?'
      },
      topValue: {
        type: String,
        default: '100px'
      },
      leftValue: {
        type: String,
        default: '300px'
      }
    }
  }
</script>

<style scoped lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    transition: opacity 0.3s ease;
  }
  .modal-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-container {
    position: absolute;
    z-index: 40;
    vertical-align: bottom;
    width: 100px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    button:first-of-type {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    button:last-of-type {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      color: red;
    }
    button:nth-of-type(2) {
      border-top: 1px solid lightgray;
      border-bottom: 1px solid lightgray;
    }
    button {
      width: 100%;
      background: white;
      padding: 12px 10px;
      font: {
        size: 13px;
      }
    }
  }

  @media all and (max-width: 390px) {

  }
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
