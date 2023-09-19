<script setup lang="ts">
import { nextTick, ref, reactive, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useConfigStore } from "@/stores/config";

const route = useRoute();
const config = useConfigStore();


let startIndex = ref(Number(route.params.startIndex ?? '0'));

const rowContent = computed(() => 
    Array.from(
        {length: config.numberOfRows}, 
        (_, x) => ({
            index: x + startIndex.value,
            content: Array.from(
                {length: config.numberOfColumns},
                (_, y) => {
                    const index = x * config.numberOfRows + y + startIndex.value
                    return {
                        index,
                        content: String.fromCharCode(index)
                    }
                })
        })
        )
)

watch(route, () => {
    startIndex.value = Number(route.params.startIndex);

    nextTick(() => {
        console.log(rowContent);
    })
    
})

function title({index}: {index: number}): string {
    return `char for the code : ${index.toString(10)} (0x${index.toString(16)})`;
}

function* generateheaders() {
    for (let i = 0; i < config.numberOfColumns; i++) {
        yield {key: i, value: i.toString(config.numberOfColumns)};
    }
}

</script>

<template>
    <main>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th v-for="header in generateheaders()" :key="header.key">
                        {{ header.value }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="row of rowContent" 
                    :key="row.index"
                >
                    <td class="row__index">{{ row.index + startIndex }}</td>
                    <td 
                        v-for="cell of row.content" 
                        :key="cell.index"

                        class="row__cell"
                    >
                        <span :title="title(cell)">{{ cell.content }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<style lang="scss" scoped>
main {
    width: 100%;
    padding: 1rem 0;
}

table {
  width: 100%;
}

thead {
    position: sticky;
    top: 0;
    background-color: var(--color-background);
}
.row {
    &__index {
        background-color: rgb(77, 77, 77);
        position: sticky;
        left: 0;
    }

    &__cell {
        background-color: #7399ab;
        color: #333;
        width: auto;

        span {
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
        }
    }
}
</style>