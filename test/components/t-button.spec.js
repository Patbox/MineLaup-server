import { mount } from '@vue/test-utils'
import TButton from '~/components/form/TButton'

describe('TButton component', () => {
  it('Should run function on click', () => {
    const onClick = jest.fn()
    const wrapper = mount(TButton, {
      listeners: {
        click: onClick,
      },
    })

    wrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('Should be disabled', () => {
    const wrapper = mount(TButton, {
      propsData: {
        disabled: true,
      },
    })

    expect(wrapper.element.disabled).toBe(true)
  })

  it('Should show icon', () => {
    const wrapper = mount(TButton, {
      propsData: {
        icon: 'user',
      },
    })

    expect(wrapper.find('i.fas.fa-user').exists()).toBe(true)
  })
})
