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
            :required="required"
            :pattern="pattern"
            @input="e => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
            @invalid.prevent="(e) => checarValidacoes((e.target as HTMLInputElement).validity)"
            @blur="(e) => checarValidacoes((e.target as HTMLInputElement).validity)"
        />
        <p
            class="campo__sub-info"
            v-if="subinfo"
        >{{ subinfo }}</p>
        <p
            class="campo__erro"
            :id="`${id}-erro`"
            v-if="erro"
        >{{ erro }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "CampoForm",
    emits: ["update:modelValue"],
    props: {
        type: {
            type: String,
            required: true,
        },
        pattern: {
            type: String
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
        },
        subinfo: {
            type: String,
            required: false
        },
        required: {
            type: Boolean,
            default: false
        },
        erroCustomizado: {
            type: String
        }
    }, setup(props) {
        const erro = ref('');
        const checarValidacoes = (validityState: ValidityState) => {
            if (validityState.valueMissing) return erro.value = 'Esse campo não pode ser deixado vazio.';
            if (!validityState.valid) return erro.value = 'Preencha esse campo corretamente.';
            if (props.erroCustomizado) return erro.value = props.erroCustomizado;
            if (validityState.valid) return erro.value = '';
        };

        return {
            checarValidacoes,
            erro
        };
    }
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

    &__sub-info {
        font-size: .8rem;
        margin: 0;
        color: #515D74;
    }

    &__erro {
        color: #F44336;
        font-size: .8rem;
        margin: 0;
    }
}
</style>
