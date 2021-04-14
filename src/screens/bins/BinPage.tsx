import { Box, Heading, StyledOcticon, TabNav, Text } from '@primer/components'
import { CodeSquareIcon, CommentDiscussionIcon } from '@primer/octicons-react'
import { useRouter } from 'next/dist/client/router'
import { useCommentsQuery } from '../../hooks/queries'
import { MainLayout } from '../MainLayout'
import { Bin, FilesTab } from './FilesTab'
import { CommentsTab } from './CommentsTab'

export const BinPage = ({ bin }: { bin: Bin }) => {
  const {
    query: { tab, id: binId },
    ...router
  } = useRouter()

  const { data: comments, isLoading: isLoadingComments } = useCommentsQuery(
    binId as string
  )

  return (
    <MainLayout>
      <Box mx={200} my={4}>
        <Heading fontSize={5} mb={2} fontWeight="normal">
          Testeee
        </Heading>
        <Text fontSize={1} color="text.gray">
          Criado por <Text fontWeight="bold">anonymous</Text> em{' '}
          <Text fontWeight="bold">19/03/2021</Text>
        </Text>
        <TabNav my={4}>
          <TabNav.Link
            selected={tab !== 'files'}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              router.push({ query: { tab: 'conversation', id: binId } })
            }>
            <StyledOcticon icon={CommentDiscussionIcon} mr={2} size={16} />
            Comentários
          </TabNav.Link>
          <TabNav.Link
            selected={tab === 'files'}
            style={{ cursor: 'pointer' }}
            onClick={() => router.push({ query: { tab: 'files', id: binId } })}>
            <StyledOcticon icon={CodeSquareIcon} mr={2} size={16} />
            Arquivos
          </TabNav.Link>
        </TabNav>
        {tab === 'files' && (
          <FilesTab
            bin={bin!}
            comments={comments!}
            isLoadingComments={isLoadingComments}
          />
        )}
        {tab !== 'files' && (
          <CommentsTab
            bin={bin!}
            comments={comments!}
            isLoadingComments={isLoadingComments}
          />
        )}
      </Box>
    </MainLayout>
  )
}
