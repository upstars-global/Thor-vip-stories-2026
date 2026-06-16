<template>
    <picture>
        <source
            v-for="itemSourceElements in sourceElements"
            :key="itemSourceElements.media"
            :srcset="itemSourceElements.srcset"
            :media="itemSourceElements.media"
        >
        <img
            :src="src"
            :alt="alt"
            loading="lazy"
            v-bind="$attrs"
            @load="onLoad"
        >
    </picture>
</template>
<script lang="ts">
export default {
    name: "FePicture",
    inheritAttrs: false, // not work ??
};
</script>

<script setup lang="ts">
import { computed } from "vue";

import {
    IConfigForTypeImage,
    IMG_QUERY_DPR,
    IResizeImgQueryParams,
} from "@theme/configs/imgResize/imageConfig";
import { getConfigImg, TypeImage } from "@theme/configs/imgResize";

interface IProps {
    src: string,
    type: TypeImage,
    alt?: string,
}

const props = defineProps<IProps>();
const emit = defineEmits<{(e: "onLoad", value: boolean): void }>();

const configImgByType = computed<IConfigForTypeImage>(() => {
    return getConfigImg(props.type);
});

function setQueryParams(url: string, mapQueries: IResizeImgQueryParams): string {
    const stringQueries: Record<string, string> = {};

    Object.keys(mapQueries).forEach((key) => {
        stringQueries[key] = mapQueries[key].toString();
    });

    return `${ url }?${ new URLSearchParams(stringQueries).toString() }`;
}

function getQueryForResize(type, breakPoint): IResizeImgQueryParams {
    const { width, height } = configImgByType.value.sizeByBreakPoint[breakPoint];
    return { width, height };
}

function getQueryForResizeRetina(type, breakPoint): IResizeImgQueryParams {
    return { ...getQueryForResize(type, breakPoint), [IMG_QUERY_DPR]: 2 };
}

function setSrcset(src, type, viewport) {
    const breakPoint = Object.keys(configImgByType.value.sizeByBreakPoint).find((item) => {
        return Number(item) >= Number(viewport);
    });

    const urlImg = setQueryParams(`/resize/${ type }${ src }`, getQueryForResize(type, breakPoint));
    const urlImgRetina = setQueryParams(`/resize/${ type }${ src }`, getQueryForResizeRetina(type, breakPoint));

    return `${ urlImg } 1x, ${ urlImgRetina } 2x`;
}

const sourceElements = computed(() => {
    return Object.keys(configImgByType.value.sizeByBreakPoint)
        // eslint-disable-next-line id-length
        .sort((a, b) => {
            return Number(b) - Number(a);
        })
        .map((breakpoint) => {
            return {
                srcset: setSrcset(props.src, props.type, breakpoint),
                media: `(min-width: ${ breakpoint }px)`,
            };
        });
});

function onLoad() {
    emit("onLoad", true);
}

</script>

<style scoped lang="scss">
object {
    pointer-events: none;
}
</style>
