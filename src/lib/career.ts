import { mockCareerPath } from '../mock/data';

export async function getCareerPaths() {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  return [mockCareerPath];
}

export async function getCareerPath(id: string) {
  const { data, error } = await supabase
    .from('career_paths')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as CareerPath;
}