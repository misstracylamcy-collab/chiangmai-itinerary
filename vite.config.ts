import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ 重要：把下面的 base 改成你的 GitHub repository 名稱
// 例如 repo 叫 chiangmai-itinerary，就寫 '/chiangmai-itinerary/'
// 如果是用 username.github.io 這個 repo，則寫 '/'
export default defineConfig({
  plugins: [react()],
  base: '/chiangmai-itinerary/',
})
