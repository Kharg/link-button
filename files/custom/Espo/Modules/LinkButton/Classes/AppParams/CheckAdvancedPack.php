<?php

namespace Espo\Modules\LinkButton\Classes\AppParams;

use Espo\Core\ORM\EntityManager;
use Espo\Entities\Extension;
use Espo\Tools\App\AppParam;

class CheckAdvancedPack implements AppParam
{
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function get(): bool
    {
        /** @var ?Extension $advancedPack */
        $advancedPack = $this->entityManager
            ->getRDBRepository(Extension::ENTITY_TYPE)
            ->where([
                'name' => 'Advanced Pack',
                'isInstalled' => true,
            ])
            ->findOne();

        return $advancedPack !== null;
    }
}