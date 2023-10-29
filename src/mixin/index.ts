// 应用名
export const appName: string = "House App";

// 默认头像路径
export const defaultAvatar: string = "src/assets/otto.jpg"

// 跳转路由
import router, { routesMap } from '@/router';
import { usePublicStore } from '@/stores/public'

export function routerPush(path: string) {
  const publicStore = usePublicStore()

  switch (path) {
    case routesMap.home.path:
      publicStore.activeIndex = routesMap.home.path
      break
    case routesMap.about.path:
      publicStore.activeIndex = routesMap.about.path
      break
    case routesMap.login.path:
      publicStore.activeIndex = routesMap.login.path
      break
    case routesMap.register.path:
      publicStore.activeIndex = routesMap.register.path
      break
    default:
      ;
  }

  // console.log(router)
  router.push(path).catch((err) => {
    console.log(err)
  })
}