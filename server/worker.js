import { Worker } from 'bullmq';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import { Document } from '@langchain/core/documents';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CharacterTextSplitter } from '@langchain/textsplitters';
const worker = new Worker(
  'file-upload-queue',
  async (job) => {
    console.log(`Job:`, job.data);
    const data = JSON.parse(job.data);
   

    const loader = new PDFLoader(data.path);
    const docs = await loader.load();
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
      apiKey: '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',
    });
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: 'http://localhost:6333',
        collectionName: 'langchainjs-testing',
      }
    );
    await vectorStore.addDocuments(docs);
    console.log(`All docs are added to vector store`);
  },
    
  {
    concurrency: 100 ,
    connection: {
    host: 'localhost',
    port: '6379',
  },
  }
);