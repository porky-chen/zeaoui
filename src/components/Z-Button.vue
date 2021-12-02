<template>
    <div>
        <template>
            <el-button
            v-bind='filterAttributes({
                targetObj: $attrs,
                excludePrefixes: ["icon"]
               })'
            v-on="$listeners" plain>
                <i :class="icon + ' el-icon--'+iconPlace" v-if="icon && iconPlace === 'left'"></i>
                <span class="btn-span" v-if="$slots.default"><slot></slot></span>
                <i :class="icon + ' el-icon--'+iconPlace" v-if="icon && iconPlace === 'right'"></i>
            </el-button>
        </template>
    </div>
</template>

<script>
import componentUtil from '@/mixins/component-util'
export default {
    name:'z-button',
    mixins: [componentUtil],
    props:{
        iconPlace:{
            type:String,
            default: 'left'
        },
        icon:{
            type:String,
            default: ''
        },
        buttonType:{
            type:String,
            default: ''
        },
    },
}
</script>
<style lang="sass" scoped>
.btn-span
    margin: 0 !important
.el-icon--right,
.el-icon--left
    margin: 0 !important
</style>