import { mount } from '@vue/test-utils'
import TInput from '~/components/form/TInput'

describe('TInput component', () => {
  const value = 'first'

  it('Should change value', () => {
    const wrapper = mount(TInput, {
      propsData: {
        id: 'test',
        value,
        label: 'test',
      },
    })

    const inputEl = wrapper.find('input#test')
    expect(inputEl.element.value).toBe('first')

    inputEl.setValue('hello world')

    wrapper.trigger('input')
    expect(Object.keys(wrapper.emitted())[0]).toBe('input')
    expect(inputEl.element.value).toBe('hello world')
  })

  it('Should set input type', () => {
    const wrapper = mount(TInput, {
      propsData: {
        id: 'test',
        value,
        label: 'test',
        type: 'password',
      },
    })
    const inputEl = wrapper.find('input#test')
    expect(inputEl.element.type).toBe('password')
  })

  it('Should show error message', () => {
    const wrapper = mount(TInput, {
      propsData: {
        id: 'test',
        value,
        label: 'test',
        error: 'error',
      },
    })

    const errorEl = wrapper.find('p.text-red-500.italic')
    expect(errorEl.exists()).toBe(true)
    expect(errorEl.text()).toBe('error')
  })

  it('Should show an icon', () => {
    const wrapper = mount(TInput, {
      propsData: {
        id: 'test',
        value,
        label: 'test',
        icon: 'user',
      },
    })
    expect(wrapper.find('i.fas.fa-user').exists()).toBe(true)
  })

  it('Should show an eye icon for password', () => {
    const wrapper = mount(TInput, {
      propsData: {
        id: 'test',
        value,
        label: 'test',
        type: 'password',
      },
    })
    const iconEl = wrapper.find('i.fas.cursor-pointer')
    expect(iconEl.exists()).toBe(true)
    expect(wrapper.vm.showPass).toBe(false)

    iconEl.trigger('click')

    expect(wrapper.vm.showPass).toBe(true)
  })
})
