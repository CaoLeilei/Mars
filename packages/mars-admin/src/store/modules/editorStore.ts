/**
 * @description: editorStore
 */
import { defineStore } from 'pinia'

export interface IEditorState {
  ViewType: string
  ViewWidth?: number
  ViewHeight?: number
}

export const useEditorStore = defineStore('EditorStore', {
  state: (): IEditorState => ({
    ViewType: 'PC',
  }),
  actions: {}
})