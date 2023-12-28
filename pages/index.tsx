import { useCallback, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { nanoid } from 'nanoid'
import { MetaHeader } from '~~/components/meta-header'
import { LoaderIcon, ViewIcon } from '~~/components/icons'
import { Balance, getParsedError } from '~~/components/scaffold-eth'
import { projectsSupported } from '~~/constants'
import { useDeployedContractInfo, useScaffoldContractWrite } from '~~/hooks/scaffold-eth'
import { useTargetNetwork } from '~~/hooks/scaffold-eth/useTargetNetwork'
import { notification } from '~~/utils/scaffold-eth'
import { CustomInput } from '~~/components/scaffold-eth/Input/custom-input'

export default function Home() {
  const [txValue, setTxValue] = useState<string | bigint>('')

  const { writeAsync } = useScaffoldContractWrite({
    contractName: 'CommunityDonations',
    functionName: 'donate',
  })

  const multiplyBy1e18 = useCallback(
    (value: string | bigint) => {
      if (!value) {
        return
      }
      if (typeof value === 'bigint') {
        return value * 10n ** 18n
      }
      return BigInt(Math.round(Number(value) * 10 ** 18))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [txValue],
  )

  const handleWrite = async () => {
    if (writeAsync) {
      try {
        writeAsync({ value: multiplyBy1e18(txValue) })
      } catch (e: any) {
        const message = getParsedError(e)
        notification.error(message)
      } finally {
        setTxValue('')
      }
    }
  }

  return (
    <>
      <MetaHeader />

      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="flex items-center justify-center bg-base-100">
            <div className="flex justify-between w-full max-w-screen-sm">
              <div>
                <ContractInfo />
              </div>
              <div>
                <label htmlFor="my-drawer-4" className="flex items-center justify-center h-auto cursor-pointer">
                  <ViewIcon className="w-10 h-10 my-1 mr-2 fill-purple-500" /> all projects
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center flex-grow gap-2 pt-10">
            <div className="flex flex-col items-center p-5 ">
              <Image
                src="/logo-donation.png"
                alt="Community donation logo"
                width={150}
                height={150}
                className="rounded-xl"
              />
            </div>
            <div className="flex-grow w-full max-w-md bg-secondary p-0.5 rounded-full">
              <CustomInput value={txValue} onChange={setTxValue} placeholder="value (wei)" />
            </div>
            <button
              onClick={() => handleWrite()}
              className={clsx('btn btn-secondary border border-purple-500 hover:border-neutral-content')}
            >
              Send donation
            </button>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
            <div className="flex-grow w-full px-8 py-2 mt-16 bg-base-300">
              <h2 className="font-bold text-center text-primary-content">Our projects</h2>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                {projectsSupported.map(project => (
                  <div className="h-auto shadow-xl rounded-xl bg-base-100" key={nanoid()}>
                    <Link href={project.link} target="_blank">
                      <figure>
                        <Image
                          src={project.image}
                          alt={`${project.name} image`}
                          className="rounded-xl w-60"
                          width={150}
                          height={150}
                        />
                      </figure>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  )
}

function ContractInfo() {
  const contractName = 'CommunityDonations'
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName)
  const { targetNetwork } = useTargetNetwork()
  if (deployedContractLoading) {
    return <LoaderIcon className="h-5" />
  }

  if (!deployedContractData) {
    return (
      <p className="text-3xl mt-14">
        {`No contract found by the name of "${contractName}" on chain "${targetNetwork.name}"!`}
      </p>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm font-bold">
        <Image src="/heart.png" alt="donations" width={50} height={50} />
      </span>
      <Balance address={deployedContractData.address} className="px-0 h-1.5 min-h-[0.375rem]" />
    </div>
  )
}
