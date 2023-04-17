<template>
    <div class="campo">
        <label
            class="campo__label"
            :for="id"
        >{{ label }}</label>
        <input
            class="campo__input"
            :id="id"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$event => $emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CampoForm",
    emits: ["update:modelValue"],
    props: {
        type: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true
        },
        modelValue: {
            type: String
        },
        placeholder: {
            type: String,
            required: false
        }
    },
});
</script>

<style scoped lang="scss">
.campo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    &__label {
        margin-top: 16px;
    }

    &__input {
        width: 100%;
        box-sizing: border-box;
        padding: 30px 16px;
        background: #FFFFFF;
        border: 1px solid rgba(81, 93, 116, 0.5);
        border-radius: 5px;
        font-size: 1.1rem;
    }
}
</style>
