<script>
import FieldValidator from "@components/FieldValidator/index.vue";
import FeTooltip, * as FeTooltipConfig from "../FeTooltip/index.vue";
import FeInput from "../FeInput";

import { ServerInput } from "@mixins/ServerInput";

export default {
    components: {
        FieldValidator,
        FeTooltip,
        FeInput,
    },

    props: {
        input: {
            type: ServerInput,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: "",
        },
        positionTooltip: {
            type: String,
            default: FeTooltipConfig.position.Bottom,
        },
        dataTest: {
            type: String,
        },
        label: {
            type: String,
        },
    },

    computed: {
        value: {
            get() {
                return this.input.value;
            },
            set(val) {
                this.input.value = val;
            },
        },
        rules() {
            return this.input.rules;
        },
    },

    methods: {
        validate() {
            return this.$refs.validator.validate();
        },
    },
};
</script>

<style lang="scss">
@import "~@theme/styles";

.input__icon {
    width: 1.5rem;
}

polyline {
    animation: checkmark 300ms ease-in;
}

@keyframes checkmark {
    0% {
        stroke-dashoffset: 3rem;
    }

    100% {
        stroke-dashoffset: 0
    }
}

</style>
