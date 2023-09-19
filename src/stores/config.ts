import { NUMBER_OF_COLLUMNS, NUMBER_OF_ROWS } from "@/const";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useConfigStore = defineStore('config', () => {
    const numberOfColumns = ref(NUMBER_OF_COLLUMNS);
    const numberOfRows = ref(NUMBER_OF_ROWS);

    const cellsPerPage = computed(() => numberOfColumns.value * numberOfRows.value);

    return {
        numberOfColumns,
        numberOfRows,
        cellsPerPage
    };
})