export const typography = {
  tabs: {
    list: 'flex text-lg gap-2 w-full',
    trigger:
      'px-[30px] py-4 bg-neutral-content rounded-t-md data-[state=active]:bg-white flex justify-start items-center gap-1 last:grow',
    content: 'px-5 py-6 bg-white data-[state=active]:flex flex-col gap-4',
  },
  forms: {
    container: 'col-span-2 rounded-lg shadow bg-white p-6',
    header: {
      container: 'border-b mb-4 border-neutral',
      mainText: 'text-lg font-semibold',
      secondText: 'text-gray-500',
    },
    row: 'flex items-end gap-form',
    input: 'input input-bordered w-full bg-white dark:bg-base-200',
    submitButton: 'btn btn-primary text-white',
    cancelButton: 'btn btn-outline',
  },
};
