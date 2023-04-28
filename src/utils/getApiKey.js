import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { projectId, secretName } from '../data/config';

const getApiKey = async () => {
    const client = new SecretManagerServiceClient();

    const [version] = await client.accessSecretVersion({
        name: `projects/${projectId}/secrets/${secretName}/versions/latest`,
    });

    const apiKey = version.payload.data.toString('utf8');
    return apiKey;
};

export default getApiKey;