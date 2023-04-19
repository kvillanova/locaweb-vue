<template>
    <div class="plano">
        <div
            class="plano__mais-usado"
            v-if="mais_usado"
        >Mais Usado</div>
        <div
            class="plano__plano-escolhido"
            v-if="plano_escolhido"
        >Plano Escolhido</div>
        <h3 class="plano__titulo">{{ titulo }}</h3>
        <h2
            v-if="preco > 0"
            class="plano__preco"
        ><small>R$</small>{{ preco }}<small>/mês</small></h2>
        <h2
            v-else
            class="plano__preco"
        >Grátis</h2>
        <p
            class="plano__preco__info"
            v-for="(info, index) in preco_infos"
            :key="index"
        >{{ info }}</p>
        <h4 class="plano__ideal">{{ ideal }}</h4>
        <button
            class="plano__escolher"
            v-if="!plano_escolhido"
            @click="escolherPlano"
        >Escolher esse plano</button>
        <div
            class="plano__topico"
            v-for="(topico, index) in topicos"
            :key="index"
        >
            <h4
                class="plano__topico__titulo"
                v-if="topico.titulo"
                v-html="topico.titulo"
            />
            <p
                class="plano__topico__item"
                role="listitem"
                v-for="(item, index) in topico.itens"
                :key="index"
            >
                <Fa icon="fa-check" /> <span v-html="item"></span>
            </p>
        </div>
        <button
            class="plano__trocar"
            v-if="plano_escolhido"
            @click="trocarPlano"
        >Trocar Plano</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Plano",
    emits: ["aoEscolherPlano", "aoTrocarPlano"],
    props: {
        titulo: {
            type: String,
            required: true
        },
        plano_id: {
            type: Number,
            required: true
        },
        preco: {
            type: Number,
            required: true
        },
        preco_infos: Array,
        ideal: {
            type: String,
            required: true
        },
        topicos: Object,
        mais_usado: Boolean,
        plano_escolhido: Boolean
    },
    setup(props, { emit }) {
        const escolherPlano = () => {
            emit('aoEscolherPlano', props.plano_id);
        };
        const trocarPlano = () => {
            emit('aoTrocarPlano');
        };

        return {
            escolherPlano,
            trocarPlano
        };
    }
});
</script>

<style lang="scss">
.plano {
    box-sizing: border-box;
    width: 300px;
    padding: 30px;
    background: white;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid #E6EAF2;
    font-size: 1rem;
    color: #666;
    margin: 0 auto;

    &__mais-usado,
    &__plano-escolhido {
        color: white;
        padding: 8px;
        margin: -42px auto 10px;
        text-transform: uppercase;
        border-radius: 10px;
        font-size: .8rem;
    }

    &__mais-usado {
        width: 100px;
        background: #10C300;
    }

    &__plano-escolhido {
        width: 150px;
        background: black;
    }

    p {
        margin: 5px auto;
    }

    &__titulo {
        margin: 10px auto 0;
        font-size: 1.4rem;
    }

    &__preco {
        font-size: 2rem;
        margin: 10px auto;
        color: #F30168;

        &>small {
            font-weight: 400;
            font-size: 1.3rem;
        }

        &__info {
            font-size: .8rem;
        }
    }

    &__ideal {
        margin: 10px auto;
        padding: 10px 0;
        border-top: solid 1px #C4C4C480;
        border-bottom: solid 1px #C4C4C480;
        font-weight: 400;
    }

    &__escolher,
    &__trocar {
        cursor: pointer;
        padding: 18px 24px;
        border-radius: 5px;
        text-transform: uppercase;
    }

    &__escolher {
        background: #F30168;
        color: white;
        border: none;
    }

    &__trocar {
        background: white;
        border: solid 1px #000;
        color: black;
    }

    &__topico {
        text-align: left;

        &__item {
            &>span {
                margin-left: 5px;
            }
        }
    }
}
</style>
