'use client';

import { newVerification } from '@/actions/auth/new-verification';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from '@/components/ui/form-error';
import { FormSuccess } from '@/components/ui/form-success';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, Suspense } from 'react';
import { BeatLoader } from 'react-spinners';

// This component will handle the actual verification logic
function VerificationContent() {
  const searchparams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const token = searchparams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError('Missing token!');
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className='flex items-center w-full justify-center'>
      {!success && !error && <BeatLoader />}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </div>
  );
}

// This is a fallback loading state while the Suspense is resolving
function VerificationLoading() {
  return (
    <div className='flex items-center w-full justify-center'>
      <BeatLoader />
    </div>
  );
}

// Main component with Suspense boundary
const NewVerificationForm = ({}) => {
  return (
    <CardWrapper
      headerLabel='Confirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='/login'
    >
      <Suspense fallback={<VerificationLoading />}>
        <VerificationContent />
      </Suspense>
    </CardWrapper>
  );
};

export default NewVerificationForm;
