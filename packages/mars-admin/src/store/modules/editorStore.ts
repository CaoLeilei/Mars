/**
 * @description: editorStore
 */
import { defineStore } from 'pinia'

export interface IEditorState {
  ViewType: string
  WidgetList: any[]
}

export const useEditorStore = defineStore('EditorStore', {
  state: (): IEditorState => ({
    ViewType: 'PC',
    WidgetList: [],
  }),
  actions: {}
})