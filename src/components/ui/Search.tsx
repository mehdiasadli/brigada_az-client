import {
  Combobox,
  ComboboxDropdownProps,
  ComboboxOptionProps,
  ComboboxOptionsProps,
  ComboboxProps,
  ComboboxStore,
  ComboboxTargetProps,
  Loader,
  TextInput,
  TextInputProps,
  UseComboboxOptions,
  useCombobox,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect } from 'react';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { ApiError } from '../../types/api';

interface SearchProps<T extends { id: string }> {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  data?: T[] | undefined | null;
  isLoading: boolean;
  isFetching: boolean;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<T[], ApiError>>;
  children: React.FC<{ item: T }>;
  onSubmit: (value: string, store: ComboboxStore, optionProps: ComboboxOptionProps) => void;
  fetchAfter?: number;
  inputProps?: TextInputProps;
  targetProps?: ComboboxTargetProps;
  dropdownProps?: ComboboxDropdownProps;
  optionsProps?: ComboboxOptionsProps;
  comboboxOptions?: UseComboboxOptions;
  comboboxProps?: ComboboxProps;
}

export default function Search<T extends { id: string }>({
  query,
  setQuery,
  data,
  isLoading,
  isFetching,
  refetch,
  children,
  onSubmit,
  inputProps,
  targetProps,
  dropdownProps,
  optionsProps,
  comboboxOptions,
  comboboxProps,
  fetchAfter = 2,
}: SearchProps<T>) {
  const store = useCombobox({
    onDropdownClose: () => store.resetSelectedOption(),
    ...comboboxOptions,
  });
  const options = (data || []).map((item) => children({ item }));

  useEffect(() => {
    if (query.length > fetchAfter) {
      refetch();
    }
  }, [query]);

  return (
    <Combobox
      store={store}
      withinPortal={true}
      onOptionSubmit={(value, optionProps) => {
        onSubmit(value, store, optionProps);
      }}
      {...comboboxProps}
    >
      <Combobox.Target {...targetProps}>
        <TextInput
          placeholder='Search ...'
          value={query}
          onChange={(e) => {
            setQuery(e.currentTarget.value);
            store.resetSelectedOption();
            store.openDropdown();
          }}
          onClick={() => store.openDropdown()}
          onBlur={() => store.closeDropdown()}
          onFocus={() => store.openDropdown()}
          leftSection={<IconSearch size={15} />}
          rightSection={(isLoading || isFetching) && <Loader size={18} />}
          {...inputProps}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={!data || data.length === 0} {...dropdownProps}>
        <Combobox.Options {...optionsProps}>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
