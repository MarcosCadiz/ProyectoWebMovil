import apiClient from './apiClient';

export async function fetchNotifications() {
  const { data } = await apiClient.get('/notifications');
  return data.notifications;
}

export async function markNotificationRead(id) {
  const { data } = await apiClient.patch(`/notifications/${encodeURIComponent(id)}/read`);
  return data.notification;
}

export async function markAllNotificationsRead() {
  await apiClient.patch('/notifications/read-all');
}
