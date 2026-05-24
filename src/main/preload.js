const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('db', {
  getUser:         ()        => ipcRenderer.invoke('get-user'),
  setUser:         (name)    => ipcRenderer.invoke('set-user', name),
  getAllLogs:       ()        => ipcRenderer.invoke('get-all-logs'),
  completeDay:     (data)    => ipcRenderer.invoke('complete-day', data),
  undoDay:         (num)     => ipcRenderer.invoke('undo-day', num),
  getStats:        ()        => ipcRenderer.invoke('get-stats'),
  updateDockBadge: (streak)  => ipcRenderer.invoke('update-dock-badge', streak),
  openExternal:    (url)     => ipcRenderer.invoke('open-external', url),
})
