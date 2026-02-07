export default function Loading({ message = 'おいしいレシピを準備中...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 border-3 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-sm text-neutral-500">{message}</p>
    </div>
  );
}
