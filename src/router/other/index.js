export default [
    {
        name:"animationTest",
        path:'/animationTest',
        component:()=> import('@/view/animationTest.vue')
    },
    {
        name:'helloWorld',
        path:'/helloWorld',
        component:()=> import('@/components/HelloWorld.vue')
    }
]