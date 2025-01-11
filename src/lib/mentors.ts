import { mockMentors } from '../mock/data';
import type { MentorFilter } from '../types/mentor';

export async function getMentors(filters: MentorFilter) {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockMentors;
}