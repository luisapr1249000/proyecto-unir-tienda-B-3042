export type Link = { link: string };

export type ServerStatusHealth = { status: string };

export type ListItemProps = {
  label: string;
  link: string;
  icon?: React.ReactNode;
  description?: string;
};

export type MenuItem = {
  label: string;
  link: string;
  icon?: React.ReactNode;
  description?: string;
};
