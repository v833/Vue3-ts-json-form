import { defineComponent, reactive } from 'vue'
// import App from './App.vue'
import Main from './components/Main.vue'
import { ref } from 'vue'
function renderMain(num: number) {
  return <Main age={num} />
}
export default defineComponent({
  setup() {
    const age = ref(6)
    const state = reactive({
      name: '312'
    })
    // 利用闭包 可以使用声明的变量
    return () => {
      console.log(state.name)
      return (
        <div id="app">
          <p>{age.value}</p>
          <input type="text" v-model={state.name} />
          <Main age={14}></Main>
          {renderMain(12)}
        </div>
      )
    }
  }
})
