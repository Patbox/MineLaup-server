import { mount } from '@vue/test-utils'
import TButton from '~/components/form/TButton'

describe('TButton component', () => {
  it('Should run function on click', () => {
    const wrapper = mount(TButton, {
      propsData: {
        onClick: () => {
          wrapper.vm.$emit('button-clicked')
        },
      },
    })

    wrapper.trigger('click')
    expect(Object.keys(wrapper.emitted())[0]).toBe('button-clicked')
  })

  it('Should be disabled', () => {
    const wrapper = mount(TButton, {
      propsData: {
        disabled: true,
        onClick: () => {},
      },
    })

    expect(wrapper.element.disabled).toBe(true)
  })

  it('Should show icon', () => {
    const wrapper = mount(TButton, {
      propsData: {
        icon: 'user',
        onClick: () => {},
      },
    })

    expect(wrapper.find('i.fas.fa-user').exists()).toBe(true)
  })
})
