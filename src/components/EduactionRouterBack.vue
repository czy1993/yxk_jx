<template>
    <div id="router-back">
        <img @click="routerBack" src="../../static/img/cha.png" alt="">
    </div>
</template>
<script>
export default {
    props:{
        routerName:{
            type: String
        }
    },
    methods:{
        routerBack(){
            // console.log(this.routerName)
            this.$router.push({
                name:this.routerName
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#router-back{
    position: absolute;
    top: 10px;
    right: 10px;
    height: 40px;
    width: 40px;
    img{
        margin: 0 auto;
        height: 30px;
        width: 30px;
    }
}
</style>
