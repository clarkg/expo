import { mergeClasses } from '@expo/styleguide';
import ReactMarkdown from 'react-markdown';

import { Callout } from '~/ui/components/Callout';
import { BOLD } from '~/ui/components/Text';

import { CommentData } from './APIDataTypes';
import { getCommentContent, getTagData, mdComponents } from './APISectionUtils';
import { ELEMENT_SPACING } from './styles';

type Props = {
  comment?: CommentData;
  sticky?: boolean;
};

export const APISectionDeprecationNote = ({ comment, sticky = false }: Props) => {
  const deprecation = getTagData('deprecated', comment);

  if (!deprecation) {
    return null;
  }

  const content = getCommentContent(deprecation.content);
  return (
    <div
      className={mergeClasses(
        `[table_&]:mt-0 [table_&]:${ELEMENT_SPACING} [table_&]:last:mb-0`,
        sticky && 'mx-[-21px] mt-[-21px] max-lg-gutters:mx-[-17px]'
      )}>
      <Callout
        size="sm"
        type="warning"
        key="deprecation-note"
        className={mergeClasses(
          '[table_&]:last-of-type:mb-2.5',
          sticky && 'rounded-b-none rounded-t-lg pl-6 pr-4 shadow-none max-md-gutters:px-4'
        )}>
        {content.length ? (
          <ReactMarkdown components={mdComponents}>{`**Deprecated** ${content}`}</ReactMarkdown>
        ) : (
          <BOLD>Deprecated</BOLD>
        )}
      </Callout>
    </div>
  );
};
