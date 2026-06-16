import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
const localVue = createLocalVue();
import Notice from "@ui-kit/FeNotice";

describe("FeNotice component", () => {
    const propsData = {
        notice: {
            id: 1,
            // eslint-disable-next-line camelcase
            img_url: "/test-img.png",
            msg: "test msg",
            button: {},
        },
    };

    const methods = {
        deleteUserNotice: jest.fn((id) => {
            return id;
        }),
    };

    it("Should render html 'props data'", () => {
        const wrapper = shallowMount(Notice, { propsData, localVue });
        expect(wrapper.find(".fe-notice__text").text()).toBe(propsData.notice.msg);
    });
    it("Action `deleteUserNotice` emit valid value", () => {
        const wrapper = mount(Notice, { propsData, methods, localVue });
        wrapper.find(".fe-notice__cancel").trigger("click");
        expect(methods.deleteUserNotice).toHaveBeenCalled();
        expect(methods.deleteUserNotice.mock.results[0].value).toBe(propsData.notice.id);
    });
});
