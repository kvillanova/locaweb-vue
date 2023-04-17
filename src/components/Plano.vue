<template>
    <div class="plano">
        <div
            class="plano__mais-usado"
            v-if="mais_usado"
        >Mais Usado</div>
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
            v-if="show_escolher"
            @click="escolherPlano"
        >Escolher esse plano</button>
        <div
            class="topico"
            v-for="(topico, index) in topicos"
            :key="index"
        >
            <h4
                class="topico__titulo"
                v-if="topico.titulo"
                v-html="topico.titulo"
            />
            <p
                class="topico__item"
                role="listitem"
                v-for="(item, index) in topico.itens"
                :key="index"
            >
                <Fa icon="fa-check" /> <span v-html="item"></span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from "@/store";
import { SELECIONAR_PLANO } from "@/store/mutation-types";

export default defineComponent({
    name: "Plano",
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
        show_escolher: Boolean
    },
    setup(props) {
        const router = useRouter();
        const store = useStore();
        const escolherPlano = () => {
            store.commit(SELECIONAR_PLANO, props.plano_id);
            router.push('/cadastro');
        };

        return {
            escolherPlano
        };
    }
});
</script>

<style scoped lang="scss">
.plano {
    position: relative;
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

    &__mais-usado {
        width: 100px;
        background: #10C300;
        color: white;
        padding: 8px;
        margin: -42px auto 10px;
        text-transform: uppercase;
        border-radius: 10px;
        font-size: .8rem;
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

    &__escolher {
        cursor: pointer;
        padding: 18px 24px;
        background: #F30168;
        border-radius: 5px;
        text-transform: uppercase;
        color: white;
        border: none;
    }
}

.topico {
    text-align: left;

    &__item {
        &>span {
            margin-left: 5px;
        }
    }
}
</style>
