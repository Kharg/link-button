<?php

namespace Espo\Modules\LinkButton\Api;

use Espo\Core\Api\Action;
use Espo\Core\Api\Request;
use Espo\Core\Api\Response;
use Espo\Core\Api\ResponseComposer;
use Espo\Core\ORM\EntityManager;
use Espo\Modules\Advanced\Entities\Workflow;

class WorkflowCheck implements Action
{
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    
    public function process(Request $request): Response
    {
        $id = $request->getRouteParams('id');
        
        $workflow = $this->entityManager->getRDBRepository('Workflow')
            ->where([
                'id' => $id,
                'type' => Workflow::TYPE_MANUAL,
                'isActive' => true,
                ])
            ->findOne();

        if (!$workflow) {
            $responseComposer = new ResponseComposer();
            return $responseComposer->json(['isManual' => false]);
        }

        $responseComposer = new ResponseComposer();
        return $responseComposer->json(['isManual' => true]);
    }
}