import { reactive, ref } from 'vue';
const hello = ref('hello world');
const helloObj = reactive({
    test:'111'
})
function textHello(){
    console.log(hello.value)
}
export {
    hello,
    helloObj,
    textHello
}